import UpcomingEvents from "./events/UpcomingEvents";

const LeftSidebar = () => {
  return (
    <div className="py-6 space-y-6">
      {/* <NavigationMenu /> */}
      <UpcomingEvents />
    </div>
  );
};

export default LeftSidebar;
