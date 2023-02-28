const todoFactory = (name, description, dueDate) => {
  const priority = false;
  const projectTag = null;
  const done = false;
  const getName = () => name;
  const setName = (newName) => {
    name = newName;
  };
  const getDescription = () => description;
  const setDescription = (newDescription) => {
    description = newDescription;
  };
  const getDueDate = () => dueDate;
  const setDueDate = (newDueDate) => {
    dueDate = newDueDate;
  };
  const getPriority = () => priority;
  const togglePriority = () => {
    dueDate = !dueDate;
  };
  const dueToday = () => {
    const todaysDate = new Date();
    return (dueDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0));
  };

  return {
    getName,
    setName,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    togglePriority,
    dueToday,
  };
};

export default todoFactory;
