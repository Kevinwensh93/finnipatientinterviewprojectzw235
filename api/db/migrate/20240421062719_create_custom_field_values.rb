class CreateCustomFieldValues < ActiveRecord::Migration[7.1]
  def change
    create_table :custom_field_values do |t|
      t.references :custom_field, null: false, foreign_key: true
      t.references :patient, null: false, foreign_key: true
      t.string :value

      t.timestamps
    end
  end
end
