import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { getMovies, voteForMovie } from "@/server/voteApi";
import { availableVoteTypes } from "@/core/vote";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      console.log("hello", opts.input.text);
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  movies: baseProcedure.query(() => {
    return getMovies();
  }),
  vote: baseProcedure
    .input(
      z.object({
        imdbId: z.string(),
        voteType: z.enum(availableVoteTypes),
      }),
    )
    .mutation((opts) => {
      return voteForMovie(opts.input.imdbId, opts.input.voteType);
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
