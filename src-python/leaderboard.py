class Leaderboard:
    def __init__(self) -> None:
        self.scores: dict[str, int] = {}

    def add_score(self, username: str, points: int):
        if username in self.scores:
            self.scores[username] += points
        else:
            self.scores[username] = points

    def remove_score(self, username: str, points: int):
        if username in self.scores:
            self.scores[username] -= points
            if self.scores[username] <= 0:
                del self.scores[username]

    def get_score(self, username: str) -> int:
        return self.scores.get(username, 0)

    def display_leaderboard(self):
        print("Leaderboard:")
        sorted_scores = sorted(self.scores.items(), key=lambda x: x[1], reverse=True)
        for i, (username, points) in enumerate(sorted_scores, start=1):
            print(f"{i}. {username}: {points}")
