import React, { useState } from "react";
import firebase from "firebase";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { useSelectedProjectValue } from "../context";

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask
}) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const AddTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (projectId = "NEXT_7") {
      collatedDate = moment().add(7, "days").format("DD/MM/YYYY");
    }

    return (
      task && projectId && firebase.firestore()
        .collection("tasks")
        .add({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: "jlIFXIwyAL3tzHMtzRbw"
        })
        .then(() => {
          setTask("");
          setProject("");
          setShowMain("");
          setShowProjectOverlay(false);
        })
    );
  };

  return (
    <div className={ showQuickAddTask 
      ? "add-task add-task__overlay" 
      : "add-task" } data-testid="add-task-comp">
        {showAddTaskMain && (
          <div className="add-task__shallow" 
            data-testid="show-main-action" 
            onClick={() => setShowMain(!showMain)}>
              <span className="add-task__plus">+</span>
              <span className="add-text">Add Task</span>
          </div>
        )}
    </div>
  )
}