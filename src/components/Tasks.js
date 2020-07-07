// import React, { useState, useEffect } from "react";
// import { Checkbox } from "./Checkbox";
// import { useTasks } from "../hooks";
// import { collatedTasks } from "../constants"
// import { getTitle, getCollatedTitle, collatedTasksExists } from "../helpers";
// import { useSelectedProjectValue, useProjectsValue } from "../context";

// export const Tasks = () => {
//   const {selectedProject} = useSelectedProjectValue();
//   const { projects } = useProjectsValue();
//   const { tasks } = useTasks(selectedProject);
  
//   let projectName = "";

//   if (projects && projects.length > 0 && selectedProject && !collatedTasksExists(selectedProject)) {
//     projectName = getTitle(projects, selectedProject).name;
//     console.log("project 1: ", projectName);
//   }

//   if (collatedTasksExists(selectedProject) && selectedProject) {
//     projectName = getCollatedTitle(collatedTasks, selectedProject).name;
//   }

//   useEffect(() => {
//     document.title = `${projectName}: Todoist`;
//   });
  
//   return (
//     <div className="tasks" data-testid="tasks">
//       <h2 data-testid="project-name">{projectName}</h2>

//       <ul className="tasks__list">
//         {tasks.map((task) => (
//           <li key={`${task.id}`}>
//             <Checkbox id={task.id}/>
//             <span>{task.task}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExists } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = '';

  if (collatedTasksExists(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExists(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>

      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} taskDesc={task.task} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
