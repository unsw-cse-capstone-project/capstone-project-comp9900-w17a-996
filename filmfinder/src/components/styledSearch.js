import styled from "styled-components"

export const SearchWarp=styled.div`
padding: .01rem  .15rem;
div{
    border: 0px solid #79BAD2;
    display: flex;
    justify-content:center;
    align-items:center;
    height: 2.5rem;
    color: #73D8FF
    background:#fff;
    img{
        width:16.5rem;
        height:15.5rem;
        margin-right: -15.05rem
    }
}
`

export const BorderSearchWarp=styled(SearchWarp)`
border-width:${props=>props.border.width};
border-color:${props=>props.border.color};
border-style:${props=>props.border.style};
// 这行是searchingmovies样式
font-size:.9rem;
  color:#d9e3f0
    
}
`
  
