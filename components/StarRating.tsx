import { StarRatingDisplay } from "react-native-star-rating-widget";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/auth-helper";
import { Text } from "@ui-kitten/components";

const StarRating = () => {
  const [rating, setRating] = useState<any>(null);
  const [ratingLength, setRatingLength] = useState<number>(0);

  useEffect(() => {
    async function getRatingForCurrentUser() {
      const today = new Date();
      today.setDate(today.getDate() - 30);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("practice_sessions")
          .select("rating")
          .gt("created_at", today.toISOString())
          .eq("student_id", user?.id);

        if (error) {
          console.error("Error fetching units:", error.message);
          // TODO - Deal with error handling
          return;
        }

        if (data) {
          const sum = data.reduce((sum, item) => (sum = sum + item.rating), 0);
          const average = sum / data.length;
          setRating(average);
        }
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    }
    getRatingForCurrentUser();
  }, []);

  if (rating === null) {
    return <Text>Error loading ratings</Text>;
  }

  if (rating === 0) {
    return <Text>No ratings yet</Text>;
  }

  if (rating !== 0 || rating !== null) {
    return <StarRatingDisplay rating={rating} />;
  }
};

export default StarRating;
