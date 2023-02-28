const projectFactory = (name, tagColor, idNum) => {
  const getName = () => name;
  const setName = (newName) => {
    name = newName;
  };
  const getTagColor = () => tagColor;
  const setTagColor = (newTagColor) => {
    tagColor = newTagColor;
  };
  const getIDNum = () => idNum;
  const setIDNum = (newIDNum) => {
    idNum = newIDNum;
  };

  return {
    getName,
    setName,
    getTagColor,
    setTagColor,
    getIDNum,
    setIDNum,
  };
};

export default projectFactory;
