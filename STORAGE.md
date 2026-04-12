# AsyncStorage Documentation

This app currently uses `AsyncStorage` for five storage patterns:

- one app setup flag
- one session list
- one master workout-name list
- one session-specific workout list pattern
- one master workout log object

## `appInitialized`

Purpose: prevents the app from re-seeding default data on every launch.

Type: string

Stored value:

```js
"true";
```

Used in:

- [app/\_layout.tsx](app/_layout.tsx)

## `sessions`

Purpose: stores the list of workout sessions shown on the Week screen.

Type: JSON-stringified array of strings

Example:

```js
["Push", "Pull", "Legs", "Upper", "Lower"];
```

Behavior:

- seeded on first app initialization
- read on the Week screen
- updated when sessions are added or deleted

Used in:

- [app/\_layout.tsx](app/_layout.tsx)
- [app/Week.jsx](app/Week.jsx)

## `allWorkouts`

Purpose: stores a master list of all unique workout names across the app.

Type: JSON-stringified array of strings

Example:

```js
["Barbell Bench Press", "Pull-Ups", "Leg Press"];
```

Behavior:

- seeded from the default workout lists
- used for autocomplete and suggestions when adding workouts
- updated when a new workout name is added

Used in:

- [app/\_layout.tsx](app/_layout.tsx)
- [app/workoutSelection.jsx](app/workoutSelection.jsx)

## `workout-<sessionName>`

Purpose: stores the workouts that belong to a specific session.

Type: JSON-stringified array of strings

Key pattern:

```js
workout - Push;
workout - Pull;
workout - Legs;
workout - Upper;
workout - Lower;
```

Example value:

```js
["Barbell Bench Press", "Incline Dumbbell Press", "Overhead Press"];
```

Behavior:

- default session keys are seeded on first launch
- any new custom session follows the same key pattern
- updated when workouts are added or deleted from a session

Used in:

- [app/\_layout.tsx](app/_layout.tsx)
- [app/workoutSelection.jsx](app/workoutSelection.jsx)

## `workoutLogsMaster`

Purpose: stores all logged workout sets, grouped by workout name and date.

Type: JSON-stringified nested object

Shape:

```js
{
  "Barbell Bench Press": {
    "2026-04-11": [
      ["80", "8"],
      ["85", "6"]
    ],
    "2026-04-10": [
      ["75", "10"]
    ]
  },
  "Pull-Ups": {
    "2026-04-11": [
      ["0", "12"]
    ]
  }
}
```

Structure:

- first key: workout name
- second key: date in `YYYY-MM-DD`
- value: array of sets
- each set: `[weight, reps]`
- both `weight` and `reps` are stored as strings

Behavior:

- updated whenever a set is added or deleted
- used to load today's workout log
- used to calculate PR weight and PR volume
- loaded into the workout context provider

Used in:

- [app/workoutScreen.jsx](app/workoutScreen.jsx)
- [app/WorkoutProvider.tsx](app/WorkoutProvider.tsx)

## Notes

- [app/localStorage.js](app/localStorage.js) exists but is currently empty.
- [app/workoutSelection.jsx](app/workoutSelection.jsx) contains a test/init effect that rewrites `workout-Push` to:

```js
["Bench Press", "Over Head Press"];
```

every time that screen mounts. That can overwrite saved Push workouts.
