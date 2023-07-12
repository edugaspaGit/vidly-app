import React from "react";
import _ from "lodash";

const ListGroup = ({
  groups,
  valueProperty,
  textProperty,
  selectedGroup,
  onGroupSelect,
}) => {
  return (
    <ul className="list-group">
      {groups.map((group) => (
        <li
          key={group[valueProperty]}
          className={
            group === selectedGroup
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGroupSelect(group)}
        >
          {group[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
