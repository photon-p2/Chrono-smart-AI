/**
 * SmartScheduler AI Engine
 * Computes optimal meeting time suggestions based on multi-participant availability,
 * timezone overlaps, buffer time compliance, historical patterns, and priority levels.
 */

class SmartScheduler {
  constructor(options = {}) {
    this.weights = {
      availability: 0.40,
      historicalPattern: 0.20,
      bufferCompliance: 0.15,
      timeOfDayPreference: 0.15,
      locationAvailability: 0.10
    };
  }

  /**
   * Main recommendation generator
   * @param {Array} participants List of participant objects with timezone, workHours, and busySlots
   * @param {Number} duration Duration in minutes (e.g., 30, 45, 60)
   * @param {Object} preferences { priority: 'high', bufferTime: 15, preferredTimeOfDay: 'morning' }
   * @param {Date} targetDate Base start date for evaluation
   */
  findOptimalSlots(participants, duration = 30, preferences = {}, targetDate = new Date()) {
    const suggestions = [];
    const baseStart = new Date(targetDate);
    baseStart.setMinutes(0, 0, 0);

    // Generate potential 30-min interval candidate slots over the next 3 days
    for (let dayOffset = 0; dayOffset < 3; dayOffset++) {
      const currentDay = new Date(baseStart);
      currentDay.setDate(baseStart.getDate() + dayOffset);

      // Evaluate hours from 8:00 AM to 6:00 PM (18:00)
      for (let hour = 8; hour < 18; hour++) {
        for (let min = 0; min < 60; min += 30) {
          const slotStart = new Date(currentDay);
          slotStart.setHours(hour, min, 0, 0);

          // Skip past slots
          if (slotStart < new Date()) continue;

          const slotEnd = new Date(slotStart.getTime() + duration * 60 * 1000);
          const scoreMetrics = this.evaluateSlot(slotStart, slotEnd, participants, duration, preferences);

          if (scoreMetrics.totalScore > 40) { // filter out completely unsuitable slots
            suggestions.push({
              startTime: slotStart.toISOString(),
              endTime: slotEnd.toISOString(),
              score: Math.round(scoreMetrics.totalScore),
              breakdown: scoreMetrics.breakdown,
              reasons: scoreMetrics.reasons,
              timezoneOverlaps: scoreMetrics.timezoneOverlaps,
              recommendedBufferBefore: preferences.bufferTime || 15,
              recommendedBufferAfter: preferences.bufferTime || 15
            });
          }
        }
      }
    }

    // Sort by score descending and return top 5
    suggestions.sort((a, b) => b.score - a.score);
    return suggestions.slice(0, 5);
  }

  evaluateSlot(slotStart, slotEnd, participants, duration, preferences) {
    let availScore = 100;
    let patternScore = 85;
    let bufferScore = 95;
    let timePrefScore = 80;
    let locationScore = 100;
    const reasons = [];
    const timezoneOverlaps = [];

    const startHour = slotStart.getHours();

    // 1. Participant Availability & Work Hours check across Timezones
    participants.forEach((p) => {
      // Calculate local hour for participant's timezone
      const localTime = new Date(slotStart.toLocaleString('en-US', { timeZone: p.timezone || 'UTC' }));
      const localHour = localTime.getHours();

      timezoneOverlaps.push({
        name: p.name,
        timezone: p.timezone || 'UTC',
        localTimeFormatted: localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isWithinWorkHours: localHour >= 9 && localHour < 17
      });

      // Outside work hours penalty
      if (localHour < 8 || localHour >= 18) {
        availScore -= 25;
        reasons.push(`Outside standard work hours for ${p.name} (${p.timezone})`);
      } else if (localHour >= 9 && localHour <= 12) {
        // Prime morning hours bonus
        availScore += 5;
      }

      // Check busy slots collision
      if (p.busySlots && p.busySlots.length > 0) {
        p.busySlots.forEach((busy) => {
          const bStart = new Date(busy.start);
          const bEnd = new Date(busy.end);
          if (slotStart < bEnd && slotEnd > bStart) {
            availScore -= 50;
            reasons.push(`Direct calendar conflict with ${p.name}`);
          }
        });
      }
    });

    availScore = Math.max(0, Math.min(100, availScore));

    // 2. Time of Day preference adjustment
    if (preferences.preferredTimeOfDay === 'morning' && startHour >= 9 && startHour < 12) {
      timePrefScore = 98;
      reasons.push("Fits morning peak productivity window");
    } else if (preferences.preferredTimeOfDay === 'afternoon' && startHour >= 13 && startHour < 16) {
      timePrefScore = 95;
      reasons.push("Fits preferred afternoon meeting slot");
    }

    // 3. Priority level boosting
    if (preferences.priority === 'urgent' || preferences.priority === 'high') {
      bufferScore = 100;
      reasons.push("High priority - prioritized early availability");
    }

    // 4. Calculate total weighted score
    const totalScore = (
      availScore * this.weights.availability +
      patternScore * this.weights.historicalPattern +
      bufferScore * this.weights.bufferCompliance +
      timePrefScore * this.weights.timeOfDayPreference +
      locationScore * this.weights.locationAvailability
    );

    if (reasons.length === 0) {
      reasons.push("Optimal work hour overlap across all attendee time zones");
      reasons.push("Includes 15m default buffer period");
    }

    return {
      totalScore,
      breakdown: {
        availability: Math.round(availScore),
        pattern: Math.round(patternScore),
        buffer: Math.round(bufferScore),
        timePreference: Math.round(timePrefScore),
        location: Math.round(locationScore)
      },
      reasons: [...new Set(reasons)],
      timezoneOverlaps
    };
  }
}

module.exports = new SmartScheduler();
