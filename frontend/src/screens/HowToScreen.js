import React from "react"
import { Jumbotron } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import Meta from "../components/Meta"
import { appname } from "../constants/commonConstants"

const HowToScreen = () => {
  return (
    <Jumbotron>
      <Meta title={`How to Order | ${appname}`} />
      <FormContainer>
        <h2>Как сделать заказ:</h2>
        <ol>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quasi et cupiditate enim impedit delectus sed deleniti deserunt assumenda, cum illo dolor quas optio vel quidem ex consectetur tenetur corrupti? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit vitae nemo dolorum doloremque, odio minus obcaecati recusandae, non porro assumenda inventore temporibus veniam aperiam quas expedita quia mollitia excepturi totam architecto earum laborum! Reprehenderit eum suscipit deleniti, ipsa eveniet sapiente odit laboriosam itaque quibusdam nulla esse error dignissimos obcaecati laudantium exercitationem aliquid tempora sit dolorum odio. Dolor, facere minima aperiam voluptates id sed similique ex ab voluptatem, earum repellendus. Nisi porro incidunt consequatur ipsa molestias, neque repudiandae. Quod repellendus earum aspernatur libero fugiat minus dolorum amet corporis molestiae voluptas? Ipsum corporis cumque excepturi molestiae officia perspiciatis qui odit impedit nulla!</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nihil explicabo perspiciatis similique magnam sit numquam voluptatem quibusdam atque! Esse eveniet provident, numquam velit obcaecati perferendis fugiat accusamus aperiam ducimus tempore doloribus quas dolores quia? Sed voluptas, delectus, iure reiciendis magni nesciunt temporibus tempora commodi, exercitationem illo debitis amet accusantium eius minus officia voluptate corporis obcaecati ipsa? Ullam quia alias accusamus ut dicta veniam dolorem, sit iste consectetur aperiam, deserunt dolorum id maiores quidem labore recusandae ad hic cupiditate? Pariatur tenetur ducimus ab et excepturi illum vitae, perspiciatis, consequuntur corporis voluptas est illo quam doloremque impedit, praesentium dicta repudiandae maxime. Magnam, animi! Fuga dolorem harum, dolorum iusto quod impedit ut voluptatem veniam at ad iste obcaecati. Fuga hic nihil exercitationem maxime esse pariatur? Atque modi tenetur aut distinctio recusandae ratione porro! Perferendis nemo et voluptatem veritatis, recusandae tenetur sequi accusantium explicabo libero eius temporibus, quas vitae ex qui delectus voluptatibus blanditiis accusamus pariatur numquam voluptas harum fuga dignissimos commodi minus. Consequatur beatae odit dolorem sapiente numquam voluptatibus, veniam, voluptatem pariatur fuga quaerat corrupti fugiat nihil architecto doloremque dolore ea explicabo quis. Distinctio sequi perferendis praesentium expedita id quis vero inventore itaque cumque? Quo laborum velit rem, at impedit repudiandae optio!</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. A nam non provident ratione quibusdam eligendi quo incidunt adipisci maxime aliquam corrupti blanditiis consectetur omnis, amet, ut voluptas animi pariatur possimus ab quisquam ad? Delectus deserunt, laborum enim expedita, commodi officia fuga quod modi quibusdam a, ut qui saepe iure voluptatum minima fugit cumque veritatis! Delectus doloribus asperiores quia reiciendis esse corporis officia laudantium nihil dolor? Impedit nobis iusto recusandae perferendis ab libero neque nesciunt cumque quas optio in at soluta, officia rerum consequatur expedita, ad minima. </li>
        </ol>
      </FormContainer>
    </Jumbotron>
  )
}

export default HowToScreen
