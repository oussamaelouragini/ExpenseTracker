// features/wallet/components/WalletScreen.tsx
// ✅ Render (JSX) only — kol el UI hna

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "@/providers/UserProvider";
import { useWallet } from "../hooks/useWallet";
import type { Account, Card, WalletActivity } from "../types/wallet.types";
import { CARD_WIDTH, styles } from "./WalletScreen.styles";

const SCREEN_W = Dimensions.get("window").width;

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. Header ─────────────────────────────────────────────────────────────────
function Header() {
  const { user } = useUser();

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.avatarCircle}>
          {user.avatarUri ? (
            <Image source={{ uri: user.avatarUri }} style={styles.headerAvatarImage} />
          ) : (
            <Ionicons name="person" size={22} color="#fff" />
          )}
        </View>
        <Text style={styles.headerTitle}>{user.fullName}</Text>
      </View>

      {/* Bell with red dot */}
      <TouchableOpacity style={styles.bellBtn} activeOpacity={0.8}>
        <Ionicons name="notifications-outline" size={20} color="#1E2A4A" />
        <View style={styles.bellDot} />
      </TouchableOpacity>
    </View>
  );
}

// ── 2. Total Net Worth ────────────────────────────────────────────────────────
function NetWorthSection({
  total,
  formatBalance,
}: {
  total: number;
  formatBalance: (n: number) => string;
}) {
  return (
    <View style={styles.netWorthSection}>
      <Text style={styles.netWorthLabel}>TOTAL NET WORTH</Text>
      <Text style={styles.netWorthAmount}>{formatBalance(total)}</Text>
    </View>
  );
}

// ── 3. Single Bank Card ───────────────────────────────────────────────────────
function BankCard({ card }: { card: Card }) {
  const dark = card.isDark;

  return (
    <View
      style={[styles.cardWrapper, dark ? styles.cardDark : styles.cardLight]}
    >
      {/* Top row — label + contactless icon */}
      <View style={styles.cardTopRow}>
        <View>
          <Text
            style={[
              styles.cardLabel,
              dark ? styles.cardLabelDark : styles.cardLabelLight,
            ]}
          >
            {card.label}
          </Text>
          <Text
            style={[
              styles.cardName,
              dark ? styles.cardNameDark : styles.cardNameLight,
            ]}
          >
            {card.name}
          </Text>
        </View>
        <View style={dark ? styles.contactlessDark : styles.contactlessLight}>
          <Ionicons
            name="wifi-outline"
            size={18}
            color={dark ? "#94A3B8" : "#3B5BDB"}
            style={{ transform: [{ rotate: "90deg" }] }}
          />
        </View>
      </View>

      {/* Card number */}
      <Text
        style={[
          styles.cardNumber,
          dark ? styles.cardNumberDark : styles.cardNumberLight,
        ]}
      >
        {"• • • •   " + card.last4}
      </Text>

      {/* Bottom row */}
      <View style={styles.cardBottomRow}>
        {/* Overlapping circles */}
        <View style={styles.circlesRow}>
          <View
            style={[
              styles.circleA,
              dark ? styles.circleDarkA : styles.circleLightA,
            ]}
          />
          <View
            style={[
              styles.circleB,
              dark ? styles.circleDarkB : styles.circleLightB,
            ]}
          />
        </View>

        {/* EXP */}
        <Text
          style={[
            styles.cardExpiry,
            dark ? styles.cardExpiryDark : styles.cardExpiryLight,
          ]}
        >
          {"EXP " + card.expiry}
        </Text>

        {/* Network */}
        <Text
          style={[
            styles.cardNetwork,
            dark ? styles.cardNetworkDark : styles.cardNetworkLight,
          ]}
        >
          {card.network}
        </Text>
      </View>
    </View>
  );
}

// ── 4. Cards Carousel ─────────────────────────────────────────────────────────
function CardsCarousel({
  cards,
  activeIndex,
  onIndexChange,
}: {
  cards: Card[];
  activeIndex: number;
  onIndexChange: (i: number) => void;
}) {
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / (CARD_WIDTH + 16));
    onIndexChange(index);
  };

  return (
    <View style={styles.cardsSection}>
      <ScrollView
        horizontal
        pagingEnabled={false}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsScroll}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        // Show peek of next card
        contentInset={{ right: 40 }}
      >
        {cards.map((card) => (
          <BankCard key={card.id} card={card} />
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View style={styles.dotsRow}>
        {cards.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

// ── 5. Account Row ────────────────────────────────────────────────────────────
function AccountRow({
  account,
  formatBalance,
}: {
  account: Account;
  formatBalance: (n: number) => string;
}) {
  return (
    <View style={styles.accountCard}>
      {/* Icon */}
      <View
        style={[
          styles.accountIconWrapper,
          { backgroundColor: account.iconBgColor },
        ]}
      >
        <Ionicons
          name={account.icon as any}
          size={22}
          color={account.iconColor}
        />
      </View>

      {/* Info */}
      <View style={styles.accountInfo}>
        <Text style={styles.accountName}>{account.name}</Text>
        <Text style={styles.accountMeta}>
          {account.bank} • {account.last4}
        </Text>
      </View>

      {/* Balance + badge */}
      <View style={styles.accountRight}>
        <Text style={styles.accountBalance}>
          {formatBalance(account.balance)}
        </Text>
        {account.badge && (
          <Text style={[styles.accountBadge, { color: account.badgeColor }]}>
            {account.badge}
          </Text>
        )}
      </View>
    </View>
  );
}

// ── 6. Activity Item ──────────────────────────────────────────────────────────
function ActivityItem({
  item,
  formatAmount,
}: {
  item: WalletActivity;
  formatAmount: (n: number) => string;
}) {
  const isPos = item.amount >= 0;
  return (
    <View style={styles.activityItem}>
      {/* Icon */}
      <View
        style={[
          styles.activityIconWrapper,
          { backgroundColor: item.iconBgColor },
        ]}
      >
        <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
      </View>

      {/* Info */}
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>

      {/* Amount */}
      <Text
        style={[
          styles.activityAmount,
          isPos ? styles.activityPos : styles.activityNeg,
        ]}
      >
        {formatAmount(item.amount)}
      </Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────────────────────────────────────
export default function WalletScreen() {
  const {
    cards,
    accounts,
    activity,
    totalNetWorth,
    activeCardIndex,
    setActiveCardIndex,
    formatBalance,
    formatAmount,
  } = useWallet();

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F8" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* 1 — Header */}
          <Header />

          {/* 2 — Total Net Worth */}
          <NetWorthSection
            total={totalNetWorth}
            formatBalance={formatBalance}
          />

          {/* 3 — Cards Carousel */}
          <CardsCarousel
            cards={cards}
            activeIndex={activeCardIndex}
            onIndexChange={setActiveCardIndex}
          />

          {/* 4 — Accounts */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Accounts</Text>
            <TouchableOpacity style={styles.manageBadge} activeOpacity={0.8}>
              <Text style={styles.manageBadgeText}>MANAGE</Text>
            </TouchableOpacity>
          </View>

          {accounts.map((acc) => (
            <AccountRow
              key={acc.id}
              account={acc}
              formatBalance={formatBalance}
            />
          ))}

          {/* 5 — Activity */}
          <View style={[styles.sectionRow, { marginTop: 24 }]}>
            <Text style={styles.sectionTitle}>Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>SEE ALL</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 18,
              paddingHorizontal: 16,
              marginBottom: 8,
              shadowColor: "#000",
              shadowOpacity: 0.04,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            {activity.map((item) => (
              <ActivityItem
                key={item.id}
                item={item}
                formatAmount={formatAmount}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
