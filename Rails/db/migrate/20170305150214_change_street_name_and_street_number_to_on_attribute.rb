class ChangeStreetNameAndStreetNumberToOnAttribute < ActiveRecord::Migration[5.0]
   def up
    add_column     :clients, :street, :string, null: false
    remove_column  :clients, :street_number
    remove_column  :clients, :street_name
  end

  def down
    remove_column  :clients, :street
    add_column     :clients, :street_number, :integer
    add_column     :clients, :street_name, :string
  end
end
