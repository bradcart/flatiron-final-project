class CreateTemplates < ActiveRecord::Migration[6.0]
  def change
    create_table :templates do |t|
      t.string :identifier
      t.string :photoUrl
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
