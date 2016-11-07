class CreateSongsTags < ActiveRecord::Migration[5.0]
  def change
    create_table :songs_tags do |t|
      t.references :song, foreign_key: true
      t.references :tag, foreign_key: true
      t.timestamps
    end
  end
end
