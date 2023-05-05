const todoFactory = (name, description, dueDate, projectID, priority, idNum, isDone) => {
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
    priority = !priority;
  };
  const getProjectID = () => projectID;
  const setProjectID = (newProjectID) => {
    projectID = newProjectID;
  };
  const getIDNum = () => idNum;
  const setIDNum = (newIDNum) => {
    idNum = newIDNum;
  };
  const getIsDone = () => isDone;
  const toggleDone = () => {
    isDone = !isDone;
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
    getIDNum,
    setIDNum,
    getIsDone,
    toggleDone,
  };
};

export default todoFactory;
