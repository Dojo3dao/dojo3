#!/bin/bash
# Setup script for local Dojo3 domain
# Adds dojo3.local and *.dojo3.local to /etc/hosts

set -e

echo "🌐 Setting up local Dojo3 domain..."
echo ""

# Backup hosts file
HOSTS_FILE="/etc/hosts"
BACKUP_FILE="/etc/hosts.backup_dojo3_$(date +%s)"

if [ ! -f "$BACKUP_FILE" ]; then
    sudo cp "$HOSTS_FILE" "$BACKUP_FILE"
    echo "✅ Backed up hosts file to: $BACKUP_FILE"
fi

# Function to add/update hosts entry
add_host_entry() {
    local ip=$1
    local domain=$2
    
    if grep -q "^$ip[[:space:]].*$domain" "$HOSTS_FILE"; then
        echo "✓ $domain already in hosts"
    else
        echo "$ip    $domain" | sudo tee -a "$HOSTS_FILE" > /dev/null
        echo "✓ Added $domain to hosts"
    fi
}

# Add main domain
add_host_entry "127.0.0.1" "dojo3.local"
add_host_entry "127.0.0.1" "www.dojo3.local"

# Add wildcard entries for testing
add_host_entry "127.0.0.1" "test.dojo3"
add_host_entry "127.0.0.1" "demo.dojo3"
add_host_entry "127.0.0.1" "user1.dojo3"
add_host_entry "127.0.0.1" "user2.dojo3"

echo ""
echo "✅ Hosts file updated successfully!"
echo ""
echo "Local domains configured:"
echo "  📍 http://dojo3.local          - Main site"
echo "  📍 http://test.dojo3           - Test user"
echo "  📍 http://user1.dojo3          - User 1 site"
echo "  📍 http://<username>.dojo3     - Any user site"
echo ""
echo "💡 Tip: Update hosts file again if needed:"
echo "  sudo cat $HOSTS_FILE | grep dojo3"
