// import styled from "styled-components";
//
//
// //PromoPage ----------------------------
// const PromPageContainer = ItemsContainer.extend`
//     text-align: left;
//     & div {
//         overflow: auto;
//         margin-bottom: 0;
//     }
//     @media screen and (max-width: 480px) {
//         padding-left: 20px;
//         padding-right: 20px;
//     }
// `;
//
// const DescriptionContainer = styled.div`
//     padding: 50px 130px 95px 130px;
//     border-bottom: 1px solid #e4e4e4;
//     @media screen and (max-width: 768px) {
//         padding-left: 0;
//         padding-right: 0;
//     }
// `;
//
// const Back = PromoHeading.extend`
//     padding-left: 50px;
//     color: #000;
//     background: url("./img/back.svg") no-repeat left;
//     background-size: 25px;
// `;
//
// const Heading = styled.h2`
//     margin-bottom: 30px;
//     font-size: 25px;
//     font-weight: 400;
// `;
//
// const Parag = styled.p`
//     font-size: 16px;
//     color: #4a4a4a;
// `;
//
// const Description = Parag.extend`
//     margin-bottom: 70px;
// `;
//
// const Include = Parag.extend`
//     margin-bottom: 65px;
//     font-size: 22px;
//     font-weight: 300;
//     color: #5e0e8a;
// `;
// //------------------------------------------
//
//
//
// const PromoPage = ({imgUrl, name, heading, description, include, effect}) => {
//     return (
//         <div>
//             <HeadingFlexContainer>
//                 <a href={`/newstore/ru/promotionslist`}><Back>{name}</Back></a>
//             </HeadingFlexContainer>
//             <FilterFlexContainer/>
//             <PromPageContainer>
//                 <Banner src={imgUrl} alt={name}/>
//                 <DescriptionContainer>
//                     <Heading>{heading}</Heading>
//                     <Description>{description}</Description>
//                     <Include>В наборе: {include}</Include>
//                     <Parag>{effect}</Parag>
//                 </DescriptionContainer>
//             </PromPageContainer>
//         </div>
//     );
// };
