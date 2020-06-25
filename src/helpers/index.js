import {collatedTasks} from "../constants";

export const collatedTasksExist = (selectedTask) => {
  collatedTasks.find((task) => task.key === selectedTask)
}