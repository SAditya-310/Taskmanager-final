const solve = async (data) => {
    if (!data || data.length === 0)
        return { priorityTask: null, count: 0, cntpd: 0 };

    let count = 0;     // completed within last 24 hours
    let cntpd = 0;     // pending tasks
    let bestTask = null;
    let bestScore = -Infinity;

    const now = Date.now();

    for (const task of data) {

        // ignore overdue (already handled separately in UI)
        if (task.status === "overdue") continue;

        /* -------------------------------------------------
           COMPLETED TASKS (last 24 hours counter)
        --------------------------------------------------*/
        if (task.status === "completed") {

            if (!task.doneAt) continue;

            const [year, month, day] = task.doneAt.split("-").map(Number);
            const [hour, minute] = (task.doneTime || "00:00").split(":").map(Number);

            // Local IST-safe time
            const doneTimeMs = new Date(year, month - 1, day, hour, minute, 0).getTime();

            const diffMs = now - doneTimeMs;

            // count only if within last 24h and not future
            if (diffMs >= 0 && diffMs <= 24 * 60 * 60 * 1000) {
                count++;
            }

            continue;
        }

        /* -------------------------------------------------
           PENDING TASKS (priority calculation)
        --------------------------------------------------*/
        cntpd++;

        // Mongo stores UTC midnight → extract calendar date safely
        const d = new Date(task.deadline);

        const year  = d.getUTCFullYear();
        const month = d.getUTCMonth();      // already 0-index
        const day   = d.getUTCDate();

        const [hour, minute] = (task.time || "23:59").split(":").map(Number);

        // reconstruct LOCAL deadline time
        const deadlineMs = new Date(year, month, day, hour, minute, 0).getTime();

        const diffMs = deadlineMs - now;
        const hoursRemaining = diffMs / (1000 * 60 * 60);

        /* -------- SMART URGENCY CURVE --------
           human-like behaviour
        --------------------------------------*/
        let urgencyBoost;

        if (diffMs <= 0) {
            // overdue → very urgent
            urgencyBoost = 200;
        } else {
            // exponential urgency growth as deadline nears
            urgencyBoost = Math.min(200, 50 * Math.exp(-hoursRemaining / 6));
        }

        const importance = task.importance || 1;

        // final priority score
        const score = (importance * 10) + urgencyBoost;

        const taskObj = task.toObject ? task.toObject() : task;

        if (score > bestScore) {
            bestScore = score;
            bestTask = { ...taskObj, priorityScore: score };
        }
    }

    return {
        priorityTask: bestTask,
        count: count,
        cntpd: cntpd
    };
};

export default solve;