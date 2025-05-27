import ManageHabits from "./components/manage-habits";

export default async function Habits() {
  return (
    <div className="flex flex-1 flex-wrap justify-center w-full p-4 gap-4">
      <ManageHabits />
    </div>
  );
}
