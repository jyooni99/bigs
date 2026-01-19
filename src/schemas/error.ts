import z from "zod";

export const serverError = z.record(z.string(), z.array(z.string()));
