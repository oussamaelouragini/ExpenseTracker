// app/(tabs)/goals/create.tsx
// ✅ Create Goal screen — accessible via router.push("/(tabs)/goals/create")
// ✅ Full screen — edges complets, pas de tab bar visible

import ScreenWrapper from "@/core/components/ScreenWrapper";
import CreateGoalScreen from "@/features/goals/components/CreateGoalScreen";

export default function CreateGoalRoute() {
  return (
    <ScreenWrapper backgroundColor="#f5f7f9">
      <CreateGoalScreen />
    </ScreenWrapper>
  );
}
