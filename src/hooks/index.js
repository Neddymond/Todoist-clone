import { useState, useEffect } from "react";
import {firebase} from "../firebase";
import { collatedTasksExists } from "../helpers"
import moment from "moment";

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
    .firestore()
    .collection("tasks")
    .where("userId", "==", "jlIFXIwyAL3tzHMtzRbw");

    unsubscribe = selectedProject && !collatedTasksExists(selectedProject)
      ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
      : selectedProject === "TODAY"
      ? (unsubscribe = unsubscribe.where("date", "==", moment().format("DD/MM/YYYY")))
      : selectedProject === "INBOX" || selectedProject === 0
      ? (unsubscribe = unsubscribe.where("date", "==", ""))
      : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapShot) => {
      const newTasks = snapShot.docs.map((task) => ({
        id: task.id,
        ...task.data()
      }));

      setTasks(
        selectedProject === "NEXT_7" 
          ? newTasks.filter((task) => moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 && task.archived !== true)
          : newTasks.filter((task) => task.archived !== true)
      );

      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    /** We return unsubscribe because we don't want to be checking for project all the time; only when there's a new project */
    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", "jlIFXIwyAL3tzHMtzRbw")
      .orderBy("projectId")
      .get()
      .then((snapShot) => {
        const allProjects = snapShot.docs.map((project) => ({
          ...project.data(),
          docId: project.id
        }));

        /** Ensure there is a difference before setting projects */
        if(JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};