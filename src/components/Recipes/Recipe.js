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

  useEffect(() => {
    fetch(`http://localhost:3001/recipes`)
      .then((response) => response.json())
      .then((data) => setData(data));
    fetch(`http://localhost:3001/specials`)
      .then((response) => response.json())
      .then((data) => setIngredients(data));
  }, []);

  console.log(data);

  console.log(ingredients);

  return (
    <div>
      {data?.map((item) => (
        <Accordion>
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
              {item.ingredients.map((item) => (
                <li>
                  {item.amount + " " + item.measurement + " of " + item.name}

                  {/* <p>
                    {" "}
                    {item.uuid}
                    {" -----     "}
                    {ingredients.map((ingred) => ingred.ingredientId)}
                  </p> */}
                </li>
              ))}
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Recipe;
