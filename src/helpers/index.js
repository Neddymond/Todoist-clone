import {collatedTasks} from "../constants";

export const collatedTasksExists = (selectedTask) => {
  collatedTasks.find((task) => task.key === selectedTask)
}