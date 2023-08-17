import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import Header from "./components/Header";
import ShowLineChart from "./components/ShowLineChart";
import ShowTable from "./components/ShowTable";

let data = []; /*[{date,case,death,recover}]*/
let cases, deaths, recovered;
let startD = "2000-1";
let endD = "2100-12";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_chart: [{}],
    };
  }

  countPeople(acases, adeaths, arecovered, startD, endD) {
    //alert(2);
    let startDate = new Date(startD);
    let endDate = new Date(endD);
    let datas = {};
    for (let x in acases) {
      let strDate = x.split("/");
      let index = `20${strDate[2]}-${strDate[0]}`;
      if (!datas[index]) {
        datas[index] = [0, 0, 0];
      }
      datas[index][0] += acases[x];
      datas[index][1] += adeaths[x];
      datas[index][2] += arecovered[x];
    }
    for (let x in datas) {
      let xDate = new Date(x);
      if (startDate <= xDate && xDate <= endDate) {
        //alert(0);
        data.push({
          date: x,
          case: datas[x][0],
          death: datas[x][1],
          recover: datas[x][2],
        });
      }
    }
    //alert(0);
    this.setState({
      data_chart: data,
    });
    cases = {};
    deaths = {};
    recovered = {};
    data = [];
  }
  changeDate() {
    startD = document.getElementById("startdate").value;
    endD = document.getElementById("enddate").value;

    if (startD && endD) {
      //alert(startD + "-" + endD);
      let startDate = new Date(startD);
      let endDate = new Date(endD);
      //alert(startDate);
      if (startDate <= endDate) {
        axios
          .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
          .then((response) => {
            //alert(1);
            cases = response.data["cases"];
            deaths = response.data["deaths"];
            recovered = response.data["recovered"];
            this.countPeople(cases, deaths, recovered, startD, endD);
            //console.log(cases);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((response) => {
        cases = response.data["cases"];
        deaths = response.data["deaths"];
        recovered = response.data["recovered"];
        this.countPeople(cases, deaths, recovered, startD, endD);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { data_chart } = this.state;
    return (
      <>
        <Header data={data_chart} changeDate={this.changeDate} />
        <div id="lineChart">
          <ShowLineChart data={data_chart} />
        </div>
        <ShowTable />
      </>
    );
  }
}

export default App;
