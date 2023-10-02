export type Task = {
  id: number;
  task: string;
  confirmed: boolean;
};

export type Database = {
  tasks: Task[];
};
