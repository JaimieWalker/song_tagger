class Song < ApplicationRecord
	has_many :songs_tags
	has_many :tags, through: :songs_tags
end
