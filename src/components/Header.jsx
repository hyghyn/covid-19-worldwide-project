import logoReact from "../assets/react.svg";
import InputDate from "./InputDate";

const Header = ({ data, changeDate }) => {
  return (
    <div className="header">
      <a href="#" className="logo">
        <img src={logoReact} />
        <span>COVID-19 Worldwide</span>
      </a>
      <div className="header-right">
        <span className="custom-select">
          <label>Start Date : </label>
          <select name="startdate" id="startdate" onChange={changeDate}>
            <option value="">วันที่เริ่มต้น</option>
            {data.map((x, index) => {
              return <InputDate value={x.date} key={index} />;
            })}
          </select>
        </span>
        <span className="custom-select">
          <label>End Date : </label>
          <select name="enddate" id="enddate" onChange={changeDate}>
            <option value="">วันที่สิ้นสุด</option>
            {data.map((x, index) => {
              return <InputDate value={x.date} key={index} />;
            })}
          </select>
        </span>
      </div>
    </div>
  );
};

export default Header;
