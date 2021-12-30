import { useEffect, useState } from "react";
import React from "react";

import Accordion from "@mui/material/Accordion";
import Card from "@mui/material/Card";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./Recipe.styles.css";

const Recipe = () => {
  const [data, setData] = useState();
  const [ingredients, setIngredients] = useState();
  const [ingredientUUID, setIngredientUUID] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/recipes`)
      .then((response) => response.json())
      .then((data) => setData(data));
    fetch(`http://localhost:3001/specials`)
      .then((response) => response.json())
      .then((data) => setIngredients(data));
  }, []);

  console.log(data);
  // console.log("ingred array", ingredients);
  let itemArray = [];
  const buildUUIDArray = () => {
    ingredients?.map((ingred) => itemArray.push(ingred.ingredientId));
  };

  buildUUIDArray();
  console.log("itemArray", itemArray);
  return (
    <div className="accordian">
      {data?.map((item) => (
        <Accordion key={item.uuid}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {" "}
            <img
              src={"http://localhost:3001" + item.images.medium}
              alt="recipeImage"
            />
            <h4>Cooking Instructions</h4>
            <Typography className="instructions">
              {item.directions.map((item) => item.instructions)}
            </Typography>
            <Card className="ingredients">
              <h5>Ingredients</h5>
              {item.ingredients.map((ingred) => (
                <li key={ingred.uuid}>
                  {ingred.amount +
                    " " +
                    ingred.measurement +
                    " of " +
                    ingred.name}

                  <p>
                    {" "}
                    {ingred.uuid}
                    {" -----     "}
                    {/* {ingredients[itemArray.indexOf(ingred.uuid)] > "0"
                      ? ingredients[itemArray.indexOf(ingred.uuid)].text
                      : "none found"} */}
                    {" -----     "}
                    {itemArray.indexOf(ingred.uuid)}
                    {/* {ingredients[itemArray?.indexOf(ingred.uuid)]} */}
                    {/* {console.log(ingredients[itemArray.indexOf(ingred.uuid)])} */}
                    {/* {this} */}
                    {/* {console.log("start-----", [
                      itemArray.indexOf(ingred.uuid),
                    ])} */}
                  </p>
                </li>
              ))}
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
      <div>{ingredientUUID}</div>
    </div>
  );
};

export default Recipe;
