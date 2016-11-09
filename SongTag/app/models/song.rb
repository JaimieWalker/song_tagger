class Song < ApplicationRecord
	has_many :songs_tags, dependent: :delete_all
	has_many :tags, through: :songs_tags
end
