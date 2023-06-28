import Sidebar, { getItem } from "../../components/Sidebar";
import "../../utils/fontawesome";
import iconclass from "../../assets/icon/Classroom.png";
import ClassManage from "../../components/ClassManage";
import { useState } from "react";
import StudentManage from "../../components/StudentManage";
import SubjectManage from "../../components/SubjectManage";
import SchuduleManage from "../../components/ScheduleManage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
const itemsTop = [
  getItem(
    "Học Sinh",
    "student",
    <FontAwesomeIcon icon="fa-solid fa-graduation-cap" />
  ),
  getItem(
    "Thời Khóa Biểu",
    "schedule",
    <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
  ),
  getItem("Lớp Học", "class", <img className="w-[17.5px]" src={iconclass} />),
  getItem("Môn Học", "subject", <FontAwesomeIcon icon="fa-solid fa-book" />),
];
const itemsBottom = [
  getItem("Cài đặt", "sub5", <FontAwesomeIcon icon="gear" />),
  getItem("Đăng xuất", "logout", <FontAwesomeIcon icon="right-to-bracket" />),
];
function ManageAcademic() {
  const Navigate = useNavigate();
  const [keySelected, setKeySelected] = useState("");
  const renderPage = (key) => {
    switch (key) {
      case "student":
        return <StudentManage />;
      case "schedule":
        return <SchuduleManage />;
      case "class":
        return <ClassManage />;
      case "subject":
        return <SubjectManage />;
      default:
        return null;
    }
  };
  const handleMenuClick = (key) => {
    if (key === "logout") {
      handleLogout();
    } else {
      setKeySelected(key);
    }
  };
  const handleLogout = (key) => {
    console.log(key);
    localStorage.removeItem("access_token");
    Navigate("/login");
  };

  return (
    <div className="flex">
      <div className="w-2/10">
        <Sidebar
          itemsTop={itemsTop}
          itemsBottom={itemsBottom}
          handleMenuClick={handleMenuClick}
          handleLogout={handleLogout}
        />
      </div>
      <div className="w-8/10 flex-grow">{renderPage(keySelected)}</div>
    </div>
  );
}
export default ManageAcademic;
