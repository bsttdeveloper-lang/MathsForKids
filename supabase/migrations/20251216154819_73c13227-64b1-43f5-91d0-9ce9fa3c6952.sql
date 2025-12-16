-- Block UPDATE operations on feedback table
CREATE POLICY "No one can update feedback" 
ON public.feedback 
FOR UPDATE 
USING (false);

-- Block DELETE operations on feedback table
CREATE POLICY "No one can delete feedback" 
ON public.feedback 
FOR DELETE 
USING (false);

-- Block UPDATE operations on ratings table
CREATE POLICY "No one can update ratings" 
ON public.ratings 
FOR UPDATE 
USING (false);

-- Block DELETE operations on ratings table
CREATE POLICY "No one can delete ratings" 
ON public.ratings 
FOR DELETE 
USING (false);