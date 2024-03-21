import random
from leaderboard import Leaderboard


words = [
    "bird",
    "ant",
    "ambulance",
    "angel",
    "alarm_clock",
    "antyoga",
    "backpack",
    "barn",
    "basket",
    "bear",
    "bee",
    "beeflower",
    "bicycle",
    "book",
    "brain",
    "bridge",
    "bulldozer",
    "bus",
    "butterfly",
    "cactus",
    "calendar",
    "castle",
    "cat",
    "catbus",
    "catpig",
    "chair",
    "couch",
    "crab",
    "crabchair",
    "crabrabbitfacepig",
    "cruise_ship",
    "diving_board",
    "dog",
    "dogbunny",
    "dolphin",
    "duck",
    "elephant",
    "elephantpig",
    "everything",
    "eye",
    "face",
    "fan",
    "fire_hydrant",
    "firetruck",
    "flamingo",
    "flower",
    "floweryoga",
    "frog",
    "frogsofa",
    "garden",
    "hand",
    "hedgeberry",
    "hedgehog",
    "helicopter",
    "kangaroo",
    "key",
    "lantern",
    "lighthouse",
    "lion",
    "lionsheep",
    "lobster",
    "map",
    "mermaid",
    "monapassport",
    "monkey",
    "mosquito",
    "octopus",
    "owl",
    "paintbrush",
    "palm_tree",
    "parrot",
    "passport",
    "peas",
    "penguin",
    "pig",
    "pigsheep",
    "pineapple",
    "pool",
    "postcard",
    "power_outlet",
    "rabbit",
    "rabbitturtle",
    "radio",
    "radioface",
    "rain",
    "rhinoceros",
    "rifle",
    "roller_coaster",
    "sandwich",
    "scorpion",
    "sea_turtle",
    "sheep",
    "skull",
    "snail",
    "snowflake",
    "speedboat",
    "spider",
    "squirrel",
    "steak",
    "stove",
    "strawberry",
    "swan",
    "swing_set",
    "the_mona_lisa",
    "tiger",
    "toothbrush",
    "toothpaste",
    "tractor",
    "trombone",
    "truck",
    "whale",
    "windmill",
    "yoga",
    "yogabicycle",
]


class SketchGame:
    def __init__(self, timer_seconds: int = 60) -> None:
        self.timer_seconds = timer_seconds
        self.reset()

    def reset(self) -> None:
        self.words_left = 10
        self.words = words.copy()
        self.leaderboard = Leaderboard()
        self.current_word: str | None = None

    def pick_word(self) -> str:
        random_word = random.choice(self.words)
        self.words.remove(random_word)
        self.words_left = self.words_left - 1
        self.current_word = random_word.replace("_", " ")
        return self.current_word

    def guess(self, username: str, guess: str, time_left: int) -> None:
        if guess == self.current_word:
            self.leaderboard.add_score(username, time_left)


# Start game
# Pick one word out of the 75 and remove it from the pool
# Start timer -> 60 seconds
# Send message to start drawing
# Users in twitch chat start guessing the word
#   If the user gets it, give the user points based on time remaning
#   Else, wait until time runs out; no one gets points
# Display the word and if a user got the word
# Start new word -> loop until 10 words
# After 10 words, game ends, show leaderboard
