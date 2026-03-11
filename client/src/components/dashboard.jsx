import React, { useState } from "react";
import { useEffect } from "react";
import "./dashboard.css";
function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    priority: 0,
  });
  const token = localStorage.getItem("token");
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const gettask = async () => {
      try {
        const fet = await fetch("http://localhost:5000/gettask", {
          method: "GET",
          headers: { "Content-Type": "application/json", "token": token },
        });
        if (fet.ok) {
          const data = await fet.json();
          setTasks(data);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    }
    checktask();
    gettask();
  }, []);
  const checktask = async () => {
  try{
    const res = await fetch("http://localhost:5000/getoverdue", {
      method: "GET",
      headers: { "Content-Type": "application/json", "token": token },
    });

    if (res.ok) {
      console.log("Overdue tasks updated");
    } else {
      console.error("Failed to update overdue tasks");
    }
  } catch (err) {
    console.error("Error checking overdue tasks:", err);
  }
}
  const addtask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/addtask", {
        method: "POST",
        headers: { "Content-Type": "application/json", "token": token },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setTasks([...tasks, data]);
        setShowModal(false);
        setFormData({ title: "", date: "", time: "", priority: 0 });
        alert("Task added successfully!");
      } else {
        alert(data.message || data.errors?.[0]?.msg || "Error adding task");
      }
    } catch (err) {
      console.log(err);
      alert("Error connecting to server");
    }
  };

  const markDone = async (taskId) => {
    try {
      const res = await fetch(`http://localhost:5000/mark/${taskId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "token": token }
      });
      if (res.ok) {
        const updatedTask = await res.json();
        setTasks(tasks.map(task => task._id == taskId ? updatedTask.task : task));
        const msg = updatedTask.message;
        alert(msg);
      } else {
        const data = await res.json();
        alert(data.message || "Error marking task as done");
      }
    } catch (err) {
      console.log(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="home-wrapper">
      <header className="dashboard-header">
        <div>
          <h1 className="section-title">Schedule Overview</h1>
          <p className="section-subtitle">You have {tasks.length} tasks scheduled.</p>
        </div>
        <button className="add-task-btn" onClick={() => setShowModal(true)}>
          + New Task
        </button>
      </header>
      <div className="task-list-container">
        <div className="list-header">
          <span>Task Detail</span>
          <span>Due Date/Done At</span>
          <span>Status</span>
          <span>Action</span>
        </div>
        {tasks.map((task) => (
          <div key={task._id} className="task-row-item">
            <div className="task-main-info">
              <div className={`category-dot ${(task.category || 'general').toLowerCase()}`}></div>
              <div>
                <div className="task-name-text">{task.title}</div>
              </div>
            </div>
            <div className="task-date">
              {task.status === "completed"
                ? task.doneAt
                : (task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : "N/A")
              }
              <span className="time-text">
                @{task.status === "completed" ? (task.doneTime || "00:00") : (task.time || "00:00")}
              </span>
            </div>
            <div>
              <span className={`priority-badge ${task.status === "completed" ? 'low' : 'high'}`}>
                {task.status}
              </span>
            </div>
            <button 
              className="done-action-btn" 
              onClick={() => markDone(task._id)}
              disabled={task.status === "completed" || task.status === "overdue"}
              style={{
                opacity: task.status === "completed" || task.status === "overdue" ? 0.5 : 1,
                cursor: task.status === "completed" || task.status === "overdue" ? 'not-allowed' : 'pointer'
              }}
            >
              {task.status === "completed" ? "✓ Completed" : "Mark Done"}
            </button>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Create New Task</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={addtask}>
              <div className="modal-body">
                <div className="input-field">
                  <label>Task Title</label>
                  <input name="title" type="text" value={formData.title} onChange={handleInputChange} placeholder="e.g., Study Java Generics" required />
                </div>

                <div className="input-row">
                  <div className="input-field">
                    <label>Due Date</label>
                    <input name="date" type="date" value={formData.date} onChange={handleInputChange} required />
                  </div>
                  <div className="input-field">
                    <label>Time</label>
                    <input name="time" type="time" value={formData.time} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="input-field">
                  <label>Importance / Priority on a scale of 10</label>
                  <input name="priority" type="number" min="1" max="10" value={formData.priority} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="create-btn">Add to Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;