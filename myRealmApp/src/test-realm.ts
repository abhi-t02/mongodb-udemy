import Realm, { ObjectSchema } from "realm";

class Task extends Realm.Object<Task> {
  _id!: number;
  name!: string;
  status?: string;
  owner_id?: string;

  static schema: ObjectSchema = {
    name: "Task",
    properties: {
      _id: "int",
      name: "string",
      status: "string?",
      owner_id: "string?",
    },
    primaryKey: "_id",
  };
}

const realm = await Realm.open({
  schema: [Task],
});

// realm.write(() => {
//   realm.create(Task, {
//     _id: 1,
//     name: "go grocery shopping",
//     status: "Open",
//   });
//   realm.create(Task, {
//     _id: 2,
//     name: "go exercise",
//     status: "Open",
//   });
// });

const allTasks = realm.objects(Task);

console.log(allTasks);

// const task1 = allTasks.find((task) => task._id === 1)!;
// console.log(task1);

// realm.write(() => {
//   task1.name = "some new one";
// });

// console.log(allTasks);

realm.close();
