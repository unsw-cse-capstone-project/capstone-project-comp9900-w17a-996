import React from 'react';
import { List, Avatar } from 'antd';
import recom1 from '../rec1.jpg';
import recom2 from '../rec2.jpg';
import recom3 from '../rec3.jpg';
import recom4 from '../rec4.jpg';

function RecommendList(){
    const data = [
        {
          title: 'Zhan lang II (2017)',
          content:"China's deadliest special forces operative settles into a quiet life on the sea.",
          src: recom1
        },
        {
          title: 'Liu lang di qiu (2019)',
          content: "As the sun is dying out, people all around the world build giant planet thrusters to move Earth out of its orbit and sail Earth to a new star system.",
          src: recom2
        },
        {
          title: 'Hong hai xing dong (2018)',
          content: "PLA Navy Marine Corps launch a hostage rescue operation in the fictional Republic of Ihwea and undergo a fierce battle with rebellions and terrorism.",
          src: recom3
        },
        {
          title: 'Tang ren jie tan an 2 (2018) Title 4',
          content: "Tang and Qin team up to solve a murder in New York's Chinatown.",
          src: recom4
        },
      ];
    return(
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src={item.src} style={{height:'50px',width:'50px'}}/>}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.content}
                />
            </List.Item>
            )}
        />
    )
}
export default RecommendList;