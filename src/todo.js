const todoFactory = (name, description, dueDate) => {
  const priority = false;
  const projectID = null;
  const isDone = false;
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
  const isDueToday = () => {
    const todaysDate = new Date();
    return (dueDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0));
  };
  const isOverdue = () => {
    const todaysDate = new Date();
    return (dueDate.setHours(0, 0, 0, 0) <= todaysDate.setHours(0, 0, 0, 0));
  };
  const getPriority = () => priority;
  const togglePriority = () => {
    dueDate = !dueDate;
  };
  const getProjectID = () => projectID;
  const setProjectID = (newProjectID) => {
    projectID = newProjectID;
  };
  const getIsDone = () => isDone;
  const setDone = () => {
    isDone = true;
  };
  const setNotDone = () => {
    isDone = false;
  };

  return {
    getName,
    setName,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    isDueToday,
    isOverdue,
    getPriority,
    togglePriority,
    getProjectID,
    setProjectID,
    getIsDone,
    setDone,
    setNotDone,
  };
};

export default todoFactory;
