import Realm, { ObjectSchema } from "realm";

const app = new Realm.App({
  id: "application-0-sixoo",
});

const anonymousUser = await app.logIn(Realm.Credentials.anonymous());

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

// Create a `SyncConfiguration` object.
const config: Realm.Configuration = {
  schema: [Task],
  sync: {
    // Use the previously-authenticated anonymous user.
    user: anonymousUser,
    // Set flexible sync to true to enable sync.
    flexible: true,
    // Define initial subscriptions to start syncing data as soon as the
    // realm is opened.
    initialSubscriptions: {
      update: (subs, realm) => {
        subs.add(
          // Get objects that match your object model, then filter them by
          // the `owner_id` queryable field
          realm.objects(Task).filtered(`owner_id == "${anonymousUser.id}"`)
        );
      },
    },
  },
};

const realm = await Realm.open(config);
