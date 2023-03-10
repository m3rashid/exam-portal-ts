import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { bgColor, borderColor } from 'utils/bgColor';
import { Bar, Doughnut } from 'react-chartjs-2';

export interface IStats {
  file: string;
  id: string;
  stats: any;
  maxmMarks: number;
}

const Stats: React.FC<IStats> = (props) => {
  const [state, setState] = useState({
    id: props.id,
    stats: props.stats,
    scorelable: [] as any,
    scoredata: [] as any,
    bgColor1: [] as any,
    borColor1: [] as any,
    maxmMarks: props.maxmMarks,
    passData: [0, 0],
    passLable: ['Fail', 'Pass'],
    stat: [
      '91% to 100%',
      '81% to 90%',
      '71% to 80%',
      '61% to 70%',
      '50% to 60%',
      'Below 50%',
    ],
    statData: [0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    let { bgColor1, borColor1 } = state;
    var maxi = -1;
    let p = 0;
    let f = 0;
    let p90_100 = 0;
    let p80_90 = 0;
    let p70_80 = 0;
    let p60_70 = 0;
    let p50_60 = 0;
    let below50 = 0;
    var pc = 0;
    state.stats.forEach((d: any, i: number) => {
      pc = (d.score / state.maxmMarks) * 100;
      if (pc >= 91) p90_100++;
      else if (pc >= 81) p80_90++;
      else if (pc >= 71) p70_80++;
      else if (pc >= 61) p60_70++;
      else if (pc >= 50) p50_60++;
      else below50++;

      if (d.score >= state.maxmMarks / 2) p++;
      else f++;
      if (d.score > maxi) maxi = d.score;
    });
    let dp = [] as any;
    let label = [] as any;

    for (let i = 0; i <= maxi; i++) {
      dp.push(0);
      label.push(i);
      bgColor1.push(bgColor[i]);
      borColor1.push(borderColor[i]);
    }

    state.stats.forEach((d: any, i: number) => {
      dp[d.score]++;
    });

    setState((prev) => ({
      ...prev,
      scorelable: label,
      scoredata: dp,
      bgColor1: bgColor1,
      borColor1: borColor1,
      passData: [f, p],
      statData: [p90_100, p80_90, p70_80, p60_70, p50_60, below50],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const barData = {
    labels: state.scorelable,
    datasets: [
      {
        label: 'Scores',
        data: state.scoredata,
        backgroundColor: state.bgColor1,
        borderColor: state.borColor1,
        borderWidth: 1,
      },
    ],
  };

  const doughnutData1 = {
    labels: state.passLable,
    datasets: [
      {
        label: 'Pass/Fail',
        data: state.passData,
        backgroundColor: [bgColor[0], bgColor[1]],
        borderColor: [borderColor[0], borderColor[1]],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData2 = {
    labels: state.stat,
    datasets: [
      {
        label: 'Percentage wise category',
        data: state.statData,
        backgroundColor: [
          bgColor[0],
          bgColor[1],
          bgColor[2],
          bgColor[3],
          bgColor[4],
          bgColor[5],
        ],
        borderColor: [
          borderColor[0],
          borderColor[1],
          borderColor[2],
          borderColor[3],
          borderColor[4],
          borderColor[5],
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div>
        <Card>
          <div className='p-[10px]'>
            <b>Download the test result excel sheet.</b>
            <a
              href={props.file}
              target='_blank'
              rel='noopener noreferrer'
              className='float-right bg-[Crimson] rounded-[5px] text-white p-[0.5em] hover:bg-[Crimson] hover:text-white decoration-white' // text-decoration-none
            >
              Download
            </a>
          </div>
        </Card>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Card>
          <div style={{ padding: '10px 10px 0px 10px' }}>
            <b>Score vs No of students.</b>
          </div>
          <div style={{ padding: '0px 10px 10px 10px' }}>
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </Card>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Card>
          <Row>
            <Col span={12}>
              <div style={{ padding: '10px 10px 0px 10px' }}>
                <b>Pass/Fail.</b>
              </div>
              <div style={{ padding: '0px 10px 10px 10px' }}>
                <Doughnut data={doughnutData1} />
              </div>
            </Col>
            <Col span={12}>
              <div style={{ padding: '10px 10px 0px 10px' }}>
                <b>Percentage wise category.</b>
              </div>
              <div style={{ padding: '0px 10px 10px 10px' }}>
                <Doughnut data={doughnutData2} />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Stats;
