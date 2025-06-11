import TopContent from "./content/TopContent";
import LeftContent from "./content/LeftContent";
import RightContent from "./content/RightContent";

function MainPage() {
  return (
    <div>
      <TopContent />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <LeftContent />
        </div>

        <div className="w-full lg:flex-1">
          <RightContent />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
