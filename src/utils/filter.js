export function filterTasks(tasks, filter) {
    const [field, order] = filter.sortField.split(":");

  return tasks
    .filter(task => {
      if (filter.category && task.category !== filter.category) return false;
      if (filter.memberId && task.memberId !== filter.memberId) return false;
      return true;
    })
    .sort((a, b) => {
      if (field === "timestamp") {
        return order === "asc"
          ? new Date(a.timestamp) - new Date(b.timestamp)
          : new Date(b.timestamp) - new Date(a.timestamp);
      }
      if (field === "title") {
        return order === "asc"
          ? a.title.localeCompare(b.title, "sv")
          : b.title.localeCompare(a.title, "sv");
      }
      return 0;
    });
}