module SongHelper
	def get_songs_with_tags(tags)
		my_tags = []
		my_songs = []
		tags.each do |tag|
			my_tags += Tag.where("name LIKE ?",tag)
		end
		my_tags.each do |tag|
			my_songs << Song.joins(:tags).where("tags.id = ?",tag.id)
		end
		check = my_songs.reduce(:&)
		 if check.size == 0
		 	my_songs = my_songs.flatten.uniq
		 else
		 	my_songs = check
		 end
		return my_songs
	end

	def create_hash(songs)
		results = []
		songs.each do |song|
			results << {song: song.name, tags: song.tags.pluck(:name).join(','),song_id: song.id,tag_ids: song.tags.pluck(:id)}
		end
		return results
	end
end
