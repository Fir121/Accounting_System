import React from 'react';
import { MDBAccordion, MDBAccordionItem, MDBContainer, MDBRow, MDBCol, MDBTypography } from 'mdb-react-ui-kit';
import * as HelperFunctions from "../code";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Credit', 'Debit'],
    datasets: [
      {
        label: 'AED',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

export default function AccountReport() {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        HelperFunctions.getAccountReports(setData);
      }, []);

    return (
      <>
        <MDBContainer fluid>
        <MDBRow>
        <MDBCol start><MDBTypography tag='h2'>Account Report</MDBTypography></MDBCol>
        </MDBRow>
        <MDBRow><div style={{visibility:'hidden'}}>ABC</div></MDBRow>
        <MDBRow>
        <MDBRow>
        </MDBRow>
        <MDBAccordion borderless flush>
        {data.map((dataObj, index) => {
            return (
            <MDBAccordionItem collapseId={dataObj.account_id} headerTitle={dataObj.account_name} style={{backgroundColor:"transparent"}}>
                <div style={{height:"30vh", width:"30vh",margin:"0 auto"}}>
                <Pie options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    }} 
                    data={{
                    labels: ['Credit', 'Debit'],
                    datasets: [
                    {
                        label: 'AED',
                        data: [dataObj.credit, dataObj.debit],
                        backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                        'rgba(0,0,0, 1)',
                        'rgba(0,0,0, 1)',
                        ],
                        borderWidth: 1,
                    },
                    ],
                }} /></div>
            </MDBAccordionItem>
            
            );
          })}
        </MDBAccordion>
        </MDBRow>
        </MDBContainer>
        </>

      );
}