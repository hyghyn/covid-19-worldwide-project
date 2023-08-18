import React, { PureComponent } from "react";
import axios from "axios";

export default class ShowTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      updated: "",
      cases: "",
      todaycases: "",
      deaths: "",
      todaydeaths: "",
      recovered: "",
      todayrecoverd: "",
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    axios
      .get("https://disease.sh/v3/covid-19/all")
      .then((response) => {
        this.setState({
          updated: response.data["updated"],
          cases: response.data["cases"],
          todaycases: response.data["todayCases"],
          deaths: response.data["deaths"],
          todaydeaths: response.data["todayDeaths"],
          recovered: response.data["recovered"],
          todayrecoverd: !response.data["todayRecoverd"] && 0,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  addDot(num = 0) {
    if (num) {
      let result = [];
      let r;
      let [strNum, endNum] = num.toString().split(".");
      endNum && result.push(`.${endNum}`);
      let n = strNum.toString().length;
      let i = 1;
      while (n - 3 * i >= 0) {
        //console.log(n - 3 * i);
        r = strNum.substr(n - 3 * i, 3);
        n - 3 * i <= 0 ? result.unshift(`${r}`) : result.unshift(`,${r}`);
        if (n - 3 * i < 3) {
          r = strNum.substr(0, n - 3 * i);
          result.unshift(`${r}`);
        }
        i++;
      }
      return result.join("");
    } else {
      return 0;
    }
  }
  render() {
    const { cases, todaycases, deaths, todaydeaths, recovered, todayrecoverd } =
      this.state;
    return (
      <>
        <h1>ตารางแสดงผลการระบาดของ โควิด-19 ทั่วโลก</h1>
        <div className="cont-table">
          <table className="show-table">
            <thead>
              <tr>
                <th>ยอดรวมผู้ติดเชื้อ</th>
                <th>ยอดรวมผู้ติดเชื้อ (วันนี้)</th>
                <th>ยอดรวมผู้เสียชีวิต</th>
                <th>ยอดรวมผู้เสียชีวิต (วันนี้)</th>
                <th>ยอดรวมผู้รักษาหาย</th>
                <th>ยอดรวมผู้รักษาหายจาก (วันนี้)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.addDot(cases)} คน</td>
                <td>{this.addDot(todaycases)} คน</td>
                <td>{this.addDot(deaths)} คน</td>
                <td>{this.addDot(todaydeaths)} คน</td>
                <td>{this.addDot(recovered)} คน</td>
                <td>{this.addDot(todayrecoverd)} คน</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
