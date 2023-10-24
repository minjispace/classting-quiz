import { setupServer } from "msw/node";
import { rest } from "msw";

export const getHandler = rest.get(
  "https://opentdb.com/api.php",
  (req, res, ctx) => {
    if (
      req.url.searchParams.get("amount") === "1" &&
      req.url.searchParams.get("type") === "multiple"
    ) {
      const responseData = [
        {
          category: "Entertainment: Video Games",
          type: "multiple",
          difficulty: "easy",
          question: "Which of these is a type of monster found in Minecraft?",
          correct_answer: "Skeleton",
          incorrect_answers: ["Werewolf", "Vampire", "Minotaur"],
        },
      ];

      return res(ctx.json(responseData));
    } else {
      return res(
        ctx.status(400),
        ctx.json({ error: "Invalid request parameters" }),
      );
    }
  },
);

export const server = setupServer(getHandler);
