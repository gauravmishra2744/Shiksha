import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Badge, UserBadge } from '@/lib/models/Badge';
import { getAuthUser } from '@/lib/auth';

// Get all badges (earned and available)
export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get all badges
    const allBadges = await Badge.find().lean();

    // Get user's earned badges
    const userBadges = await UserBadge.find({ user: user.userId })
      .populate('badge')
      .lean();

    const earnedBadgeIds = new Set(
      userBadges.map(ub => ub.badge._id.toString())
    );

    const badges = allBadges.map(badge => ({
      id: badge._id,
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      type: badge.type,
      rarity: badge.rarity,
      xpReward: badge.xpReward,
      coinReward: badge.coinReward,
      earned: earnedBadgeIds.has(badge._id.toString()),
      earnedAt: userBadges.find(
        ub => ub.badge._id.toString() === badge._id.toString()
      )?.earnedAt || null
    }));

    return NextResponse.json({
      badges,
      totalEarned: userBadges.length,
      totalBadges: allBadges.length
    });

  } catch (error) {
    console.error('Badges fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch badges' },
      { status: 500 }
    );
  }
}
