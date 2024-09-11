import { z } from "zod";

const validationSchema = z.object({
  title: z.string().min(5, "Title is required"),
  overview: z.string().min(5, "Overview is required"),
  releaseYear: z.coerce.number().min(4, "Release year is required"),
  posterPath: z.string().min(5, "Poster path is required"),
  genre: z.string().min(5, "Genre is required"),
  price: z.coerce.number().min(1, "Price is required"),
});

export type SuccessResult = {
  success: true;
  data: z.infer<typeof validationSchema>;
};

export type FailureResult = {
  success: false;
  errors: Zod.ZodFormattedError<z.infer<typeof validationSchema>>;
};

export type ValidationResult = SuccessResult | FailureResult;

export async function validateMovie(
  newMovie: FormData
): Promise<ValidationResult> {
  let validatedData = await validationSchema.safeParseAsync(
    Object.fromEntries(newMovie)
  );

  if (!validatedData.success) {
    const formattedErrors = validatedData.error.format();

    return { success: false, errors: formattedErrors };
  } else {
    return { success: true, data: validatedData.data };
  }
}
