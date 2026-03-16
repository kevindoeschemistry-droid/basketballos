/* ─── BasketballOS Type Definitions ──────────────────────────────────────── */

export type UserRole =
  | "super_admin"
  | "admin"
  | "head_coach"
  | "assistant_coach"
  | "team_manager"
  | "parent"
  | "player"
  | "resident_life"
  | "athletic_director";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
  season: string | null;
  level: string | null;
  mascot: string | null;
  primary_color: string;
  secondary_color: string;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface TeamMembership {
  id: string;
  team_id: string;
  profile_id: string;
  role: string;
  joined_at: string;
}

export interface Player {
  id: string;
  team_id: string;
  profile_id: string | null;
  first_name: string;
  last_name: string;
  jersey_number: string | null;
  position: string | null;
  grade: string | null;
  height: string | null;
  weight: string | null;
  photo_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type EventType =
  | "practice"
  | "game"
  | "tournament"
  | "film_session"
  | "conditioning"
  | "team_meeting"
  | "volunteer_event"
  | "travel";

export interface TeamEvent {
  id: string;
  team_id: string;
  title: string;
  event_type: EventType;
  start_time: string;
  end_time: string | null;
  location: string | null;
  opponent: string | null;
  arrival_time: string | null;
  uniform: string | null;
  notes: string | null;
  transportation_notes: string | null;
  is_cancelled: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventRsvp {
  id: string;
  event_id: string;
  player_id: string;
  status: "available" | "late" | "not_available" | "unknown";
  notes: string | null;
  responded_at: string;
}

export interface AttendanceRecord {
  id: string;
  event_id: string;
  team_id: string;
  submitted_by: string | null;
  submitted_at: string;
  sent_to_resident_life: boolean;
  sent_at: string | null;
  delivery_status: "pending" | "sent" | "delivered" | "failed";
  notes: string | null;
}

export interface AttendanceEntry {
  id: string;
  attendance_record_id: string;
  player_id: string;
  status: "present" | "excused_absent" | "unexcused_absent" | "late" | "injured";
  notes: string | null;
}

export interface Announcement {
  id: string;
  team_id: string;
  author_id: string | null;
  title: string;
  body: string;
  audience: "everyone" | "players" | "parents" | "staff";
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface Game {
  id: string;
  event_id: string | null;
  team_id: string;
  opponent: string;
  game_date: string;
  location: string | null;
  home_away: "home" | "away" | "neutral" | null;
  team_score: number | null;
  opponent_score: number | null;
  result: "win" | "loss" | "tie" | null;
  notes: string | null;
  hudl_link: string | null;
  maxpreps_link: string | null;
  film_link: string | null;
  postgame_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlayerGameStats {
  id: string;
  game_id: string;
  player_id: string;
  minutes: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fg_made: number;
  fg_attempted: number;
  three_made: number;
  three_attempted: number;
  ft_made: number;
  ft_attempted: number;
  created_at: string;
}

export interface PracticePlan {
  id: string;
  team_id: string;
  event_id: string | null;
  title: string;
  practice_date: string;
  total_duration: number | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface PracticePlanBlock {
  id: string;
  practice_plan_id: string;
  sort_order: number;
  block_type: string;
  title: string;
  duration: number;
  instructions: string | null;
  coaching_points: string | null;
  equipment: string | null;
  created_at: string;
}

export interface VolunteerSlot {
  id: string;
  team_id: string;
  event_id: string | null;
  title: string;
  description: string | null;
  slot_type: string | null;
  spots_available: number;
  deadline: string | null;
  created_at: string;
}

export interface FundraiserCampaign {
  id: string;
  team_id: string;
  title: string;
  description: string | null;
  team_goal: number;
  player_goal: number;
  start_date: string | null;
  end_date: string | null;
  status: "draft" | "active" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface StoreProduct {
  id: string;
  team_id: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number | null;
  image_url: string | null;
  is_required: boolean;
  sizes: string[] | null;
  purchase_link: string | null;
  deadline: string | null;
  is_active: boolean;
  created_at: string;
}
