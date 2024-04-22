class CreateCustomFields < ActiveRecord::Migration[7.1]
  def change
    create_table :custom_fields do |t|
      t.string :name
      t.string :value
      t.references :patient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
